
import ctypes
import numpy as np
import matplotlib.pyplot as plt

lib = ctypes.CDLL('./libsiggen.so')

lib.generate_signal.argtypes=[np.ctypeslib.ndpointer(dtype=np.float64), np.ctypeslib.ndpointer(dtype=np.float64)]
lib.generate_signal.restype = None

lib.get_num_points.argtypes = []
lib.get_num_points.restype = ctypes.c_int

num_points = lib.get_num_points()

x = np.zeros(num_points, dtype=np.float64) 
y = np.zeros(num_points, dtype=np.float64) 

lib.generate_signal(x, y)

Y = np.fft.fft(y)

def visualize_signal_and_spectrum(x, y, Y):
    plt.figure(figsize=(12,6)) 
    plt.subplot(1,2,1)
    plt.plot(x, y)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('signal visual')

    plt.subplot(1,2,2)
    plt.plot(np.fft.fftfreq(num_points), np.abs(Y))
    plt.xlabel("Frequency")
    plt.ylabel("Magnitude")
    plt.title("spectrumVis")

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    visualize_signal_and_spectrum(x, y, Y)
