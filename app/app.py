from tkinter import *
import webview 
  
tk = Tk() 
  
tk.geometry("800x450") 
  
webview.create_window('PosSystem', 'http://127.0.0.1:5000/cashier') 
webview.start() 