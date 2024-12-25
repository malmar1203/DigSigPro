
#include <stdio.h>
#include <math.h>
#include <complex.h>

#define NUM_POINTS 100

void compute_fft(double* y, double complex* Y) {
    int n = NUM_POINTS;
    for(int i=0; i<n; ++i) {
        Y[i] = y[i] + I * 0.0;
    }

    for(int i=0; i<n; ++i){
        for(int j=0; j<n; ++j) {

            double angle = 2.0 * M_PI* i*j/n;
            Y[i] += y[j] *cexp(-I * angle);

        }
    }
}

// Function to generate the signal
void generate_signal(double* x, double* y) {
    for (int i = 0; i < NUM_POINTS; ++i) {
        x[i] = i;
        y[i] = sin(i * 0.1);  // Example signal: sine wave
    }
}

// Function to expose NUM_POINTS to Python
int get_num_points() {
    return NUM_POINTS;
}

