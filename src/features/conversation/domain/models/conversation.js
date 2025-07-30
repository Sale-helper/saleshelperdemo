class Conversation {
    constructor(conversation_id, questions, transcription, should_transcripe = false) {
        this.questions = questions
        this.transcription = transcription
        this.conversation_id = conversation_id
        this.should_transcripe = should_transcripe
      }
    record() {
        this.should_transcripe = true
    }

    finish() {
        this.should_transcripe = false
    }

    new_question (question) {
        this.questions.push(question)
    }

    get questions() {
        return this.questions
    }

}