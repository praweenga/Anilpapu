declare module "mux-embed" {
  interface MuxMonitorOptions {
    debug?: boolean;
    data: Record<string, string | number | boolean | undefined>;
  }

  const mux: {
    monitor: (element: HTMLMediaElement, options: MuxMonitorOptions) => void;
  };

  export default mux;
}
