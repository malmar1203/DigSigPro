CC = gcc
CFLAGS = -fPIC -Wall -lm
LDFLAGS = -shared

LIBRARY = libsiggen.so

SRC =signal_generator.c

all: $(LIBRARY) run

PYTHON_SCRIPT = visualize_signal_and_spectrum.py

$(LIBRARY): $(SRC)
	$(CC) $(CFLAGS) -o $(LIBRARY) $(SRC) $(LDFLAGS)

run: $(LIBRARY)
	python $(PYTHON_SCRIPT)
