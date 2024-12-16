FROM node:20
# Node.js의 최신 20.x 버전을 포함하는 공식 이미지입니다
RUN git clone https://github.com/kimhaneui/next-dashboard.git
# 컨테이너 내부에 next-dashboard 디렉토리가 생성됩니다
WORKDIR next-dashboard
# 작업 디렉토리를 next-dashboard로 설정합니다.
RUN npm install
# 프로젝트 의존성을 설치합니다
RUN npm run build
# 프로덕션 모드로 빌드합니다
EXPOSE 3000
# 컨테이너가 외부와 통신할 수 있도록 포트 3000을 열어줍니다.
CMD ["npm", "run", "start"]
# 실행할 명령을 지정합니다