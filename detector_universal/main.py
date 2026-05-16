#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
detector_universal — Detección de objetos con YOLOv8 y OpenCV.
Modos: imagen, video o cámara web según el argumento recibido.
"""

import argparse
import sys
import time
from datetime import datetime
from pathlib import Path

import cv2
from ultralytics import YOLO

# Extensiones soportadas por modo
EXTENSIONES_IMAGEN = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
EXTENSIONES_VIDEO = {".mp4", ".avi", ".mov", ".mkv"}

# Carpeta de salida (se crea automáticamente si no existe)
CARPETA_SALIDA = Path("outputs")


def crear_carpeta_salida() -> Path:
    """Crea la carpeta outputs/ si no existe y devuelve su ruta."""
    CARPETA_SALIDA.mkdir(parents=True, exist_ok=True)
    return CARPETA_SALIDA


def contar_detecciones(resultado) -> int:
    """Cuenta el número de cajas detectadas en un resultado de YOLO."""
    if resultado.boxes is None:
        return 0
    return len(resultado.boxes)


def resolver_modo(entrada: str | None) -> str:
    """
    Determina el modo de ejecución según el argumento de entrada.
    Sin argumento → cámara; con extensión de imagen/video → modo correspondiente.
    """
    if entrada is None:
        return "camara"

    extension = Path(entrada).suffix.lower()
    if extension in EXTENSIONES_IMAGEN:
        return "imagen"
    if extension in EXTENSIONES_VIDEO:
        return "video"

    raise ValueError(
        f"Formato no soportado: '{extension}'. "
        f"Imágenes: {', '.join(sorted(EXTENSIONES_IMAGEN))} | "
        f"Videos: {', '.join(sorted(EXTENSIONES_VIDEO))}"
    )


def validar_archivo(ruta: str) -> Path:
    """Comprueba que el archivo exista y sea accesible."""
    archivo = Path(ruta)
    if not archivo.is_file():
        raise FileNotFoundError(f"Archivo no encontrado: {ruta}")
    return archivo


def configurar_argumentos() -> argparse.Namespace:
    """Define y parsea los argumentos de línea de comandos con argparse."""
    parser = argparse.ArgumentParser(
        description="Detector universal de objetos con YOLOv8 (imagen, video o cámara)."
    )
    parser.add_argument(
        "entrada",
        nargs="?",
        default=None,
        help="Ruta a imagen o video. Sin argumento: cámara web.",
    )
    parser.add_argument(
        "--modelo",
        default="yolov8n.pt",
        help="Peso del modelo YOLOv8 (por defecto: yolov8n.pt)",
    )
    parser.add_argument(
        "--confianza",
        type=float,
        default=0.5,
        help="Umbral de confianza para detecciones (por defecto: 0.5)",
    )
    return parser.parse_args()


def modo_imagen(modelo: YOLO, ruta: Path, confianza: float) -> tuple[int, str | None]:
    """
    MODO 1 — IMAGEN: procesa una imagen, muestra y guarda el resultado anotado.
    """
    frame = cv2.imread(str(ruta))
    if frame is None:
        raise ValueError(f"No se pudo leer la imagen: {ruta}")

    resultados = modelo(frame, conf=confianza, verbose=False)
    resultado = resultados[0]
    anotado = resultado.plot()
    total = contar_detecciones(resultado)

    ruta_salida = crear_carpeta_salida() / "resultado_imagen.jpg"
    cv2.imwrite(str(ruta_salida), anotado)

    cv2.imshow("Detector Universal - Imagen", anotado)
    print("Presiona cualquier tecla en la ventana para cerrar...")
    cv2.waitKey(0)
    cv2.destroyAllWindows()

    return total, str(ruta_salida)


def modo_video(modelo: YOLO, ruta: Path, confianza: float) -> tuple[int, str | None]:
    """
    MODO 2 — VIDEO: procesa frame a frame, muestra en tiempo real y guarda el video.
    """
    captura = cv2.VideoCapture(str(ruta))
    if not captura.isOpened():
        raise ValueError(f"No se pudo abrir el video: {ruta}")

    ancho = int(captura.get(cv2.CAP_PROP_FRAME_WIDTH))
    alto = int(captura.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps_origen = captura.get(cv2.CAP_PROP_FPS) or 25.0

    crear_carpeta_salida()
    ruta_salida = CARPETA_SALIDA / "resultado_video.mp4"
    cuatro_cc = cv2.VideoWriter_fourcc(*"mp4v")
    escritor = cv2.VideoWriter(str(ruta_salida), cuatro_cc, fps_origen, (ancho, alto))

    if not escritor.isOpened():
        captura.release()
        raise ValueError("No se pudo crear el archivo de video de salida.")

    total_detecciones = 0
    ventana = "Detector Universal - Video"

    try:
        while True:
            ok, frame = captura.read()
            if not ok:
                break

            resultados = modelo(frame, conf=confianza, verbose=False)
            resultado = resultados[0]
            anotado = resultado.plot()
            total_detecciones += contar_detecciones(resultado)

            escritor.write(anotado)
            cv2.imshow(ventana, anotado)

            # Q o Escape para salir antes de terminar el video
            tecla = cv2.waitKey(1) & 0xFF
            if tecla in (ord("q"), ord("Q"), 27):
                print("Reproducción interrumpida por el usuario.")
                break
    finally:
        captura.release()
        escritor.release()
        cv2.destroyAllWindows()

    return total_detecciones, str(ruta_salida)


def dibujar_panel_camara(
    frame,
    fps: float,
    objetos: int,
    nombre_modelo: str,
    pausado: bool,
) -> None:
    """Dibuja un panel semitransparente con FPS, objetos, modelo y estado de pausa."""
    alto, ancho = frame.shape[:2]
    x1, y1 = 10, 10
    x2 = min(ancho - 10, 420)
    y2 = 130

    overlay = frame.copy()
    cv2.rectangle(overlay, (x1, y1), (x2, y2), (0, 0, 0), -1)
    cv2.addWeighted(overlay, 0.55, frame, 0.45, 0, frame)

    lineas = [
        f"FPS: {fps:.1f}",
        f"Objetos: {objetos}",
        f"Modelo: {nombre_modelo}",
        f"Estado: {'PAUSADO' if pausado else 'EN VIVO'}",
        "Q=Salir | S=Captura | P=Pausa",
    ]
    for i, texto in enumerate(lineas):
        cv2.putText(
            frame,
            texto,
            (x1 + 12, y1 + 28 + i * 22),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.55,
            (255, 255, 255),
            1,
            cv2.LINE_AA,
        )


def modo_camara(modelo: YOLO, confianza: float, nombre_modelo: str) -> tuple[int, str | None]:
    """
    MODO 3 — CÁMARA: detección en tiempo real con panel informativo y controles Q/S/P.
    """
    captura = cv2.VideoCapture(0)
    if not captura.isOpened():
        raise RuntimeError(
            "Cámara no disponible. Comprueba que esté conectada y no la use otra aplicación."
        )

    crear_carpeta_salida()
    total_detecciones = 0
    pausado = False
    ultima_captura: str | None = None
    ventana = "Detector Universal - Camara"
    tiempo_previo = time.perf_counter()
    fps_mostrar = 0.0

    print("Controles: Q=Salir | S=Guardar captura | P=Pausar/Reanudar")

    try:
        while True:
            if not pausado:
                ok, frame = captura.read()
                if not ok:
                    raise RuntimeError("No se pudo leer un frame de la cámara.")

                ahora = time.perf_counter()
                fps_mostrar = 1.0 / max(ahora - tiempo_previo, 1e-6)
                tiempo_previo = ahora

                resultados = modelo(frame, conf=confianza, verbose=False)
                resultado = resultados[0]
                frame = resultado.plot()
                objetos_frame = contar_detecciones(resultado)
                total_detecciones += objetos_frame
            else:
                objetos_frame = 0

            dibujar_panel_camara(frame, fps_mostrar, objetos_frame, nombre_modelo, pausado)
            cv2.imshow(ventana, frame)

            tecla = cv2.waitKey(1) & 0xFF
            if tecla in (ord("q"), ord("Q")):
                break
            if tecla in (ord("p"), ord("P")):
                pausado = not pausado
            if tecla in (ord("s"), ord("S")):
                marca = datetime.now().strftime("%Y%m%d_%H%M%S")
                ultima_captura = str(CARPETA_SALIDA / f"captura_{marca}.jpg")
                cv2.imwrite(ultima_captura, frame)
                print(f"Captura guardada: {ultima_captura}")
    finally:
        captura.release()
        cv2.destroyAllWindows()

    return total_detecciones, ultima_captura


def imprimir_resumen(modo: str, total: int, ruta_salida: str | None) -> None:
    """Imprime en consola el resumen final de la ejecución."""
    nombres_modo = {
        "imagen": "IMAGEN",
        "video": "VIDEO",
        "camara": "CÁMARA EN TIEMPO REAL",
    }
    print("\n" + "=" * 50)
    print(f"Modo usado: {nombres_modo.get(modo, modo.upper())}")
    print(f"Total de objetos detectados: {total}")
    if ruta_salida:
        print(f"Archivo de salida: {ruta_salida}")
    else:
        print("Archivo de salida: (ninguno guardado en esta ejecución)")
    print("=" * 50)


def main() -> None:
    """Punto de entrada: parsea argumentos, carga el modelo y ejecuta el modo correspondiente."""
    args = configurar_argumentos()

    if not 0.0 < args.confianza <= 1.0:
        print("Error: --confianza debe estar entre 0 y 1 (excluyendo 0).", file=sys.stderr)
        sys.exit(1)

    try:
        modo = resolver_modo(args.entrada)
    except ValueError as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)

    # Cargar modelo YOLOv8 (descarga automática del .pt si no existe)
    try:
        print(f"Cargando modelo: {args.modelo}")
        modelo = YOLO(args.modelo)
    except Exception as error:
        print(f"Error al cargar el modelo '{args.modelo}': {error}", file=sys.stderr)
        sys.exit(1)

    total = 0
    ruta_salida: str | None = None

    try:
        if modo == "imagen":
            archivo = validar_archivo(args.entrada)
            total, ruta_salida = modo_imagen(modelo, archivo, args.confianza)

        elif modo == "video":
            archivo = validar_archivo(args.entrada)
            total, ruta_salida = modo_video(modelo, archivo, args.confianza)

        else:  # camara
            total, ruta_salida = modo_camara(modelo, args.confianza, args.modelo)

    except FileNotFoundError as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)
    except RuntimeError as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)
    except ValueError as error:
        print(f"Error: {error}", file=sys.stderr)
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nEjecución interrumpida por el usuario.")
        sys.exit(0)

    imprimir_resumen(modo, total, ruta_salida)


if __name__ == "__main__":
    main()
