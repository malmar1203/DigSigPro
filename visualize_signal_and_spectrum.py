
import ctypes
import numpy as np
import matplotlib.pyplot as plt

lib = ctypes.CDLL('./libsiggen.so')

lib.generate_signal.argtypes= []
lib.generate_signal.restype = np.ctypeslib.ndpointer(dtype=np.float64, shape=(lib.get_num_points(),)) 

lib.compute_fft.argtypes=[np.ctypeslib.ndpointer(dtype=np.float64)]
lib.compute_fft.restype = np.ctypeslib.ndpointer(dtype=np.float64, shape=(2*lib.get_num_points(),)) 

lib.free_signal.argtypes = [np.ctypeslib.ndpointer(dtype=np.float64)]
lib.free_signal.restype = None

lib.get_num_points.argtypes = []
lib.get_num_points.restype = ctypes.c_int

num_points = lib.get_num_points()

x = np.zeros(num_points, dtype=np.float64) 
#y_real = np.zeros(num_points, dtype=np.float64) 
y_imag = np.zeros(num_points, dtype=np.float64) 

y_real = lib.generate_signal()
print("generated signal ")
print(y_real)
sig = 1.0 * y_real
fft_res = lib.compute_fft(y_real)
y_real_fft = fft_res[::2]
y_imag_fft = fft_res[1::2]

#Y = np.fft.fft(y)
Y = y_real_fft +1j* y_imag_fft

def visualize_signal_and_spectrum(y_real, Y):
    x = np.arange(num_points)
    plt.figure(figsize=(12,6)) 
    plt.subplot(1,2,1)
    plt.plot(x, y_real)
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
    visualize_signal_and_spectrum(y_real, Y)
    lib.free_signal(y_real)
