
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <complex.h>

#define NUM_POINTS 128 


double* compute_dft(const double * y){
    int n =NUM_POINTS;
    double* output = (double*) malloc (2*n*sizeof(double));
    if(output==NULL)
    {
        fprintf(stderr,"Memory allocation failed\n");
        exit(1);
    }

    for(int i=0; i<n; ++i)
    {
        double complex sum = 0.0;
        for(int j=0; j<n; ++j)
        {
            double angle = 2*M_PI*i*j/n;
            sum+= y[j]*cexp(-I*angle);
        }
        output[2*i] = creal(sum);
        output[2*i+1] =cimag(sum);
    }

    return output;
}

double* compute_fft(double* y) {
    int n = NUM_POINTS;
    double * output = (double*)malloc(2*n*sizeof(double));
    if(output == NULL){
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
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

    FILE * file =fopen("web/fft_data.csv", "w");
    if(file == NULL)
    {
        fprintf(stderr, "Error opening file for writing.\n");
        exit(1);
    }

    fprintf(file,"frequency,magnitude\n");
    for(int i=0; i<n; ++i)
    {
        double magnitude =sqrt(output[2*i]*output[2*i]+ output[2*i+1]* output[2*i+1]);
        fprintf(file,"%d,%lf\n",i,magnitude);
    }

    fclose(file);

    return output; 
}

// Function to generate the signal
double* generate_signal() {
    double* y = (double*) malloc(NUM_POINTS * sizeof(double));

    if(y == NULL){
        fprintf(stderr, "Memory allocation failed\n");
        exit(1);
    }

    FILE * file = fopen("web/signal_data.csv", "w");
    if(file==NULL)
    {
        fprintf(stderr, "Error opening file for writing\n");
        exit(1);
    }

    fprintf(file,"x,y\n");

    for (int i = 0; i < NUM_POINTS; ++i) {
        y[i] = 1.5*sin(i * 0.1 + M_PI/4)/(0.1*i+0.1)
            +sin(i*0.1+M_PI/2)/(0.1*i+0.1)
            -sqrt(0.1*i*i)
            ;
        fprintf(file,"%d,%lf\n",i,y[i]);
    }

    fclose(file);

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

