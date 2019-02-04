const uuid = require('uuid-random')
const { tmpdir } = require('os')
const { readFileSync, writeFileSync, unlinkSync } = require('fs')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const { getExecutablePath, defaultArgs } = require('@shelf/aws-lambda-libreoffice')

module.exports = async (context, data) => {
  context.log(data)
  const loBinary = await getExecutablePath()
  context.log(loBinary)
  const id = uuid()
  const documentFileName = `${tmpdir}/${id}.docx`
  const pdfFileName = `${tmpdir}/${id}.pdf`
  const documentData = Buffer.from(data, 'base64')

  try {
    writeFileSync(documentFileName, documentData, 'binary')
    const { stdout } = await exec(`${loBinary} ${defaultArgs.join(' ')} --convert-to pdf ${documentFileName} --outdir ${tmpdir}`)
    context.log(stdout)
    const pdf = readFileSync(pdfFileName).toString('base64')
    await unlinkSync(pdfFileName)
    context.log(`Deleted ${pdfFileName}`)
    await unlinkSync(documentFileName)
    context.log(`Deleted ${documentFileName}`)
    return pdf
  } catch (error) {
    context.log.error(error)
  }
}
