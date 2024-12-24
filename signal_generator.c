
#include <stdio.h>
#include <math.h>

#define NUM_POINTS 100

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

