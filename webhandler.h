#ifndef WEBHANDLER_H
#define WEBHANDLER_H

#include <ESP8266WebServer.h>
#include <FS.h>

//format bytes
String formatBytes(size_t bytes);
String getContentType(String filename);

bool handleFileRead(String path);
void handleRoot();
void handleTemp();
void handleNotFound();

#endif
