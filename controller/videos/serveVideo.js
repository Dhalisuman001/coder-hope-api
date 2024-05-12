import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import fs from 'fs'

// const SUCCESS = "SERVE_VIDEO_SUCCESS";
const FAILURE = "SERVE_VIDEO_FAILURE";

const videoFileMap = {
  "messi": "public/videos/messi.mp4",
  "ronaldo": "public/videos/ronaldo.mp4",
  "young_messi": "videos/young_messi.mp4",
};

const serveVideoController = expressAsyncHandler(async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    let errors = result.array()[0].msg;
    return res.status(403).json({
      status: false,
      code: FAILURE,
      payload: {
        error: errors,
      },
    });
  }

  try {
    let { filename } = req.params;
    const filepath = videoFileMap[filename];

    if (!filepath) {
      return res.status(404).json({
        status: false,
        code: FAILURE,
        payload: {
          error: "File not found",
        },
      });
    }


    const stat = fs.statSync(filepath)
    const fileSize =       stat.size;
    const range = req.headers.range

    if (range) {
        const parts = range.replace(/bytes=/,'').split('-')
        const start = parseInt(parts[0],10)
        const end =parts[1]? parseInt(parts[1],10):fileSize -1

        const chunkSize =end-start +1;
        const  file  = fs.createReadStream(filepath,{start,end})
        const head ={
            "Content-Range":`bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges":"bytes",
            "Content-Length":chunkSize,
            "Content-Type":"video/mp4"
        }
        res.writeHead(206,head)
        file.pipe(res)
    }else{
       
        const head ={
         
            "Content-Length":fileSize,
            "Content-Type":"video/mp4"
        }
        res.writeHead(206,head)
        fs.createReadStream(filepath).pipe(res)
    }

  

    
  } catch (error) {
    res.status(500).json({
      status: false,
      code: FAILURE,
      payload: {
        error: error.message,
      },
    });
  }
});

export default serveVideoController;
