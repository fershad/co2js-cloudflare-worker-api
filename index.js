import { Router } from 'itty-router'
import { co2 } from '@tgwf/co2'

// Create a new router
const router = Router()

router.get("/", () => {
  return new Response("Hello, world! This is the root page of your Worker template.")
})

router.get("/bytes/:value", ({params}) => {
  const { value } = params

  const emissions = new co2();
  const result = emissions.perByte(value);

  return new Response(JSON.stringify({result}), {
    headers: {
      "Content-Type": "application/json"
    }
  });
})

router.all("*", () => new Response("404, not found!", { status: 404 }))

addEventListener('fetch', (e) => {
  e.respondWith(router.handle(e.request))
})
