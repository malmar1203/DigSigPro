
import ctypes
import numpy as np
import matplotlib.pyplot as plt

lib = ctypes.CDLL('./libsiggen.so')

lib.generate_signal.argtypes= []
lib.generate_signal.restype = np.ctypeslib.ndpointer(dtype=np.float64, shape=(lib.get_num_points(),)) 

lib.compute_fft.argtypes=[np.ctypeslib.ndpointer(dtype=np.float64)]
lib.compute_fft.restype = np.ctypeslib.ndpointer(dtype=np.float64, shape=(2*lib.get_num_points(),)) 

lib.compute_dft.argtypes=[np.ctypeslib.ndpointer(dtype=np.float64)]
lib.compute_dft.restype = np.ctypeslib.ndpointer(dtype=np.float64, shape=(2*lib.get_num_points(),)) 

lib.free_memory.argtypes = [np.ctypeslib.ndpointer(dtype=np.float64)]
lib.free_memory.restype = None

lib.get_num_points.argtypes = []
lib.get_num_points.restype = ctypes.c_int

num_points = lib.get_num_points()

x = np.zeros(num_points, dtype=np.float64) 
#y_real = np.zeros(num_points, dtype=np.float64) 
y_imag = np.zeros(num_points, dtype=np.float64) 

y_real = lib.generate_signal()

fft_res = lib.compute_fft(y_real)
y_real_fft = fft_res[::2]
y_imag_fft = fft_res[1::2]

Y_fft = y_real_fft +1j* y_imag_fft

dft_res = lib.compute_dft(y_real)
y_real_dft = dft_res[::2]
y_imag_dft = dft_res[1::2]

Y_dft = y_real_dft +1j * y_imag_dft

def visualize_signal_and_spectrum(y_real, Y_fft, Y_dft):
    x = np.arange(num_points)
    plt.figure(figsize=(12,6)) 
    plt.subplot(1,3,1)
    plt.plot(x, y_real)
    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('signal visual')

    plt.subplot(1,3,2)
    plt.plot(np.fft.fftfreq(num_points), np.abs(Y_fft))
    plt.xlabel("Frequency")
    plt.ylabel("Magnitude")
    plt.title("fft spectrum")

    plt.subplot(1,3,3)
    plt.plot(np.fft.fftfreq(num_points), np.abs(Y_dft))
    plt.xlabel("Frequency")
    plt.ylabel("Magnitude")
    plt.title("dft spectrum")

    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    visualize_signal_and_spectrum(y_real, Y_fft, Y_dft)
    lib.free_memory(y_real)
    lib.free_memory(fft_res)
    lib.free_memory(dft_res)

