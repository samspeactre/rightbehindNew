// src/t-writer.d.ts
declare module 't-writer.js' {
    interface TWriterOptions {
      loop?: boolean;
      typeSpeed?: number;
      eraseSpeed?: number;
    }
  
    class TWriter {
      on: any;
      then(arg0: () => TWriter) {
        throw new Error('Method not implemented.');
      }
      constructor(element: HTMLElement, options?: TWriterOptions);
      type(text: string): this;
      start(): this;
      stop(): this;
    }
  
    export default TWriter;
  }
  