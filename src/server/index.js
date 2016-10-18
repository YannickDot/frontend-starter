const Express = require('express')
const path = require('path')

const React = require('react') // eslint-disable-line no-unused-vars
const {renderToString} = require('react-dom/server')

const {App} = require('../client/TestComponent.js') // eslint-disable-line no-unused-vars

const app = new Express()
const port = 3000

app.use(setResponseHeaders)
app.use('/static', Express.static(path.resolve(__dirname, '../dist')))
app.use('/', handleRender)

app.listen(port)

function handleRender(req, res) {
	const html = renderToString(
    <App />
  )
	const preloadedState = {}
	res.send(renderFullPage(html, preloadedState))
}

function renderFullPage(html, preloadedState = {}) {
	return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
        </script>
        <script src="/static/bundle.js" charset="utf-8"></script>
      </body>
    </html>
    `
}

function setResponseHeaders(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
	next()
}
