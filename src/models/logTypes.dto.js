import {level} from "@/models/level.dto";
import {question} from "@/models/question.dto";
import {message} from "@/models/message.dto";
import {answer} from "@/models/aswer.dto";
import {knowledgetype} from "@/models/knoledgeType.dto";
import {knowledge} from "@/models/knowledge.dto";
import {department} from "@/models/department.dto";
import {candidatetype} from "@/models/candidateType.dto";
import {signIn} from "@/models/singIn.dto";

export const logsDto = {
    'sign-in': signIn,
    level: level,
    question: question,
    message: message,
    answer: answer,
    knowledgetype: knowledgetype,
    knowledge: knowledge,
    department: department,
    candidatetype: candidatetype
}
