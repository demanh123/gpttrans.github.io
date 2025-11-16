self.addEventListener('activate', e => e.waitUntil(self.clients.claim()))


self.addEventListener('fetch', event => {
const url = new URL(event.request.url)
if (url.pathname === '/share' && event.request.method === 'POST') {
event.respondWith((async () => {
const data = await event.request.formData()
const text = data.get('text') || ''


const clients = await self.clients.matchAll({type:'window'})
if (clients.length) {
clients[0].postMessage({text})
clients[0].focus()
} else {
self.clients.openWindow('/?t=' + encodeURIComponent(text))
}


return new Response('OK', {status:200})
})())
}
})
