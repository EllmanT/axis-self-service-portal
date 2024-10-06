const OpenAI = require("openai");
var express = require('express');
const {ChatOpenAI, OpenAIEmbeddings} = require("@langchain/openai");
var router = express.Router();
router.post('/', async function (req, res, next) {

    const {query, text} = req.body

    console.log(req.body)

    const newApiKey = process.env.NEW_API_KEY;

    const newOrg = process.env.NEW_ORG

    const openai = new OpenAI({apiKey: newApiKey, organization: newOrg});



    const chatModel = new ChatOpenAI({openAIApiKey: newApiKey});

    await ts("openAiX")
    // await openAiXLang(newApiKey);



//     const loader = new TextLoader.TextLoader("revmax.txt");
//     const docs = await loader.load();
//
//     console.log(loader)
//
// // Load the docs into the vector store
//     const vectorStore = await new DirectoryLoader.DirectoryLoader(
//         docs,
//         new OpenAIEmbeddings({openAIApiKey: newApiKey})
//     );
//
//     let qa = RetrievalQAChain.fromLLM(openai,)
//
//     let data = await chatModel.invoke("what is LangSmith?");
//
//     console.log(data)


    // const request = {
    //     "model": "gpt-3.5-turbo",
    //     "messages": [{"role": "user", "content": "Say this is a test!"}],
    //     "temperature": 0.7
    // }
    // const stream = await openai.chat.completions.create({
    //     model: "gpt-3.5-turbo",
    //     messages: [{ role: "user", content: "Say this is a test" }],
    //     stream: true,
    // });
    // for await (const chunk of stream) {
    //     process.stdout.write(chunk.choices[0]?.delta?.content || "");
    // }
})

module.exports = router;
