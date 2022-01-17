import Messages from '../helpers/messages.js'
import dotenv from 'dotenv'
import pdf from 'html-pdf'
import logo from '../helpers/logo.js'
import json2csv from 'json2csv'
import ExcelJS from 'exceljs'
import stream from 'stream'

// Lee variables de entorno desde archivo .env
dotenv.config()

export default {
  generarPDF: async (req, res) => {
    try {
      const { width, height, border, orientation } = req.options || {}

      const pdfOptions = {
        border: border || {
          top: "1cm",            
          right: "1.5cm",
          bottom: "1cm",
          left: "1.5cm"
        },
        width: width || '21.59cm',
        height: height || '33.02cm',
        orientation: orientation || 'portrait',
        paginationOffset: 1,
        footer: {
          height: "1cm",
          contents: `
          <footer style="text-align: right;">
            <span style="display: block;">p&aacute;gina {{page}} de {{pages}}</span>
          </footer>
          `
        },
      }

      pdf.create(
        `
        <!DOCTYPE html>
        <html>
          <head>
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
            <style>
              body { font-size: 12px; font-family: 'Roboto', sans-serif; color: #333; }
              h1, h2, h3, h4 { font-weight: 400; }
              h1, h3 { font-weight: 500; }
              h3 { color: #888; }
              p { line-height: 1.5; margin-bottom: 1.3em; word-spacing: 0.16em; }
              a { color: #333; }
              header { margin-bottom: 1cm }
              header h1, header h3 { margin-left: 16px; }
              #content * { font-size: 11px !important; }
            </style>
            
          </head>
          <body>
            <header>
              <table>
                <tbody>
                  <tr>
                    <td><img width="100" src="${req.body.color ? logo.getBase64Color() : logo.getBase64BlackWhite()}" /></td>
                    <td>
                      <h1>${req.body.titulo_documento || ''}</h1>
                      <h3>${req.body.subtitulo_documento || ''}</h3>
                    </td>
                  </tr>
                </tbody>
              </table>
            </header>
            <div id="content">
              ${req.body.html}
            </div>
          </body>
        </html>
        `,
        pdfOptions
      ).toStream((err, stream) => {
        if (err) {
          return res.status(400).send({ message: err })
        } else {
          res.setHeader('Content-disposition', `inline; filename="${req.body.nombre}.pdf"`)
          res.setHeader('Content-type', 'application/pdf')
          stream.pipe(res)
        }
      })
    } catch (error) {
      return res.status(500).send({ message: Messages.error500 })
    }
  },
  jsonCSV: async (req, res) => {
    try {
      if (req.body.records && req.body.records.length) {

        const fields = Object.keys(req.body.records[0]).map( h => ({ label: h, value: h }) )
        const file_name = req.body.file_name || 'untitled.csv'

        const jsonParser = new json2csv.Parser({ 
          fields,
          eol: req.body.eol || '\r\n',
          header: req.body.header,
          delimiter: req.body.delimiter || ';',
          quote: req.body.quotes ? '"' : '',
        })
        const csv = jsonParser.parse(req.body.records)

        res.header('Content-Type', 'text/csv')
        res.attachment(file_name)
        return res.send(csv)

      } else {
        return res.status(400).send({ message: Messages.error400 })
      }
    } catch (error) {
      return res.status(500).send({ message: Messages.error500 })
    }
  },
  jsonXLSX: async (req, res) => {
    try {
      const { file_name, sheets } = req.body

      // Create Workbook
      const workbook = new ExcelJS.Workbook()
      workbook.created = new Date()
      workbook.creator = 'API'
      workbook.modified = new Date()
      workbook.lastModifiedBy = 'API'
      workbook.calcProperties.fullCalcOnLoad = true

      // Create Sheets
      sheets.forEach((sheet, sheetIdx) => {
        const worksheet = workbook.addWorksheet(sheet.name)

        // Create Sheet data
        if(sheet.content_type && sheet.content_type === 'table') {
          worksheet.addTable({
            name: `Table${sheetIdx+1}`,
            ref: 'A1',
            headerRow: true,
            style: {
              showRowStripes: true,
            },
            columns: sheet.headers.map( h => ({
              name: h,
              filterButton: true
            })),
            rows: sheet.data,
          })
        } else {
          worksheet.columns = sheet.headers.map( h => ({
            header: h
          }))

          sheet.data.forEach( (record, recordIdx) => {
            worksheet.insertRow(recordIdx + 2, record)
          })
        }

        // Set width for columns
        sheet.headers.forEach( (h, i) => {
          const col = worksheet.getColumn(i+1)
          const maxWidth = 80

          const dataLength = Math.max(...[
            `${h}`.length,
            ...sheet.data.map( r => `${r[i]}`.length )
          ])
          
          col.width = (dataLength > maxWidth ? maxWidth : dataLength) + 4
        })
      })
      
      const rs = stream.Readable()
      
      res.setHeader('Content-disposition', `inline; filename="${file_name}.xlsx"`)
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      
      workbook.xlsx.write(res)

    } catch (error) {
      console.log(error);
      return res.status(500).send({ message: Messages.error500 })
    }
  }
}