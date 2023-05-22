swagger: '2.0'
info:
  title: Dictionary Backend API
  version: 1.0.0
host: localhost:3000
basePath: /
schemes:
  - http
paths:
  /lookup/{word}:
    get:
      summary: Lookup a word in the dictionary
      parameters:
        - name: word
          in: path
          description: Word to look up
          required: true
          type: string
      responses:
        '200':
          description: Successful operation
          schema:
            type: object
            properties:
              word:
                type: string
              definition:
                type: string
        '404':
          description: Word not found
  /save:
    post:
      summary: Save a word and its definition in the dictionary
      parameters:
        - name: word
          in: body
          description: Word and definition to save
          required: true
          schema:
            type: object
            properties:
              word:
                type: string
              definition:
                type: string
      responses:
        '200':
          description: Successful operation
          schema:
            type: object
            properties:
              success:
                type: boolean
  /login:
    get:
      summary: Get the login page
      responses:
        '200':
          description: Successful operation
    post:
      summary: Authenticate user login
      responses:
        '200':
          description: Successful operation
        '401':
          description: Unauthorized
  /:
    get:
      summary: Get the home page
      responses:
        '200':
          description: Successful operation
securityDefinitions:
  passport:
    type: oauth2
    flow: implicit
    authorizationUrl: https://example.com/oauth/authorize
    scopes:
      read: Grants read access
      write: Grants write access
security:
  - passport: [read, write]
