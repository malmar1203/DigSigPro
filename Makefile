CC = gcc
CFLAGS = -fPIC -Wall -lm
LDFLAGS = -shared

LIBRARY = libsiggen.so

SRC =signal_generator.c

PYTHON_SCRIPT = visualize_signal.py

lib: $(LIBRARY) $(SRC)
	$(CC) $(CFLAGS) -o $(LIBRARY) $(SRC) $(LDFLAGS)

run: $(LIBRARY)
	python $(PYTHON_SCRIPT)
