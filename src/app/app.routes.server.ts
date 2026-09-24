import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'Detalhe/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: () => Promise.resolve(
      Array.from({ length: 10 }, (_, index) => ({ id: String(index + 1) }))
    )
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
