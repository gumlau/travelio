from langchain.document_loaders.csv_loader import CSVLoader
from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS 

api_key = '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'
 
loader = CSVLoader(file_path="Final_NTU_Course_Data.csv")
documents = loader.load()
 
embeddings_model = OpenAIEmbeddings(model='text-embedding-3-small', openai_api_key=api_key)
 
vectorstore = FAISS.from_documents(documents, embeddings_model)

docs = vectorstore.similarity_search("ME2322 Industrial transformation and technological innovation. The aim of the course is for the students to acquire concepts, models, and theories with a focus on industrial transformation and technological innovation and to use them to understand how important societal challenges affect industry and technological development and how important societal challenges can be handled. The course deepens the discussion and analysis of the societal challenges identified in ME2321 Engineering and the Global Challenges. ")
