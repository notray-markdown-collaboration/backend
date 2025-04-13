docker build -t notray-backend .
docker rm -f notray-backend
docker run -d -p 3000:3000 --name=notray-backend --network notray notray-backend
