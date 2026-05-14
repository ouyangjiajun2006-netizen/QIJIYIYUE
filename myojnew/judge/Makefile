# 编译器
CXX = g++
CXXFLAGS = -O2 -std=c++11 -I.
LDFLAGS = -lws2_32

# 目标
TARGET = judge_server.exe
SRCS = main.cpp
OBJS = $(SRCS:.cpp=.o)

all: $(TARGET)

$(TARGET): $(OBJS)
	$(CXX) -o $@ $^ $(LDFLAGS)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	del /Q $(OBJS) $(TARGET) 2>nul || true

run: $(TARGET)
	$(TARGET)

.PHONY: all clean run