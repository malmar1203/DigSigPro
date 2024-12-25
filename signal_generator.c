
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <complex.h>

#define NUM_POINTS 100

double* compute_fft(double* y) {
    int n = NUM_POINTS;
    double complex input[n];
    double * output = (double*)malloc(2*n*sizeof(double));
    if(output == NULL){
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
    }

    for(int i=0; i<n; ++i)
    {
        input[i] = y[i] + I*0.0; 
    }

    for(int i=0; i<n; ++i)
    {
        double complex sum =0.0;
        for(int j=0; j<n; ++j)
        {
            double angle = 2* M_PI *i*j/n;
            sum += y[j] *cexp(-I*angle);  
        }

        output[2*i] = creal(sum);
        output[2*i+1] = cimag(sum);
    }

    return output; 
}

// Function to generate the signal
double* generate_signal() {
    double* y = (double*) malloc(NUM_POINTS * sizeof(double));

    if(y == NULL){
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
    }

    for (int i = 0; i < NUM_POINTS; ++i) {
        y[i] = sin(i * 0.1);  // Example signal: sine wave
    }

    for(int j = 0; j < NUM_POINTS; ++j){
        printf("%f", y[j]);
    }
    printf("\n");

    return y;
}

// Function to expose NUM_POINTS to Python
int get_num_points() {
    return NUM_POINTS;
}

void free_memory(double* pointer)
{
    free(pointer);
}

