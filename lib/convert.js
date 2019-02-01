const uuid = require('uuid-random')
const { tmpdir } = require('os')
const { readFile, writeFile } = require('fs').promises
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const getLibrePath = require('./get-libre-path')

module.exports = async (context, data) => {
  const libre = getLibrePath()
  if (libre.error !== false) {
    throw libre.error
  }
  const id = uuid()
  const documentFileName = `${tmpdir}/${id}.docx`
  const pdfFileName = `${tmpdir}/${id}.pdf`
  const documentData = Buffer.from(data, 'base64')
  const convertCommand = `${libre.path} --headless --invisible --nodefault --nofirststartwizard --nolockcheck --nologo --norestore --convert-to pdf ${documentFileName} --outdir ${tmpdir}`

  await writeFile(documentFileName, documentData)
  const { stdout, stderr } = await exec(convertCommand)
  context.log(stdout)
  context.log(stderr)
  const pdf = await readFile(pdfFileName)
  return pdf.toString('base64')
}
