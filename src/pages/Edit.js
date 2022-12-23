import "../components/Navigation.js";
import styled from "styled-components";
import Nav from "../components/Navigation";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {useState} from "react";

export default function Edit({item, onEdit, onNew, isNew}) {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    mode: 'onSubmit', //default
    reValidateMode: 'onChange', //default
    criteriaMode: "firstError", //default
    shouldFocusError: true, //default
    shouldUseNativeValidation: false, //default
    defaultValues: {
      id: item.id,
      question: item.question,
      answerA: item.answers[0].de,
      answerB: item.answers[1].de,
      answerC: item.answers[2].de,
      correctly: item.correctly,
      tags: item.tags,
    }
  });

  const registerOptions = {
    question: {
      required: "Bitte eine Frage eingeben",
      minLength: {
        value: 10,
        message: "Die Frage muss min 10 Text-Zeichen haben",
      },
      maxLength: {
        value: 200,
        message: "Bitte max 200 Text-Zeichen eingeben",
      },
    },
    answerA: {
      required: "Bitte eine Antwort eingeben",
      minLength: {
        value: 4,
        message: "Die Antwort muss min 4 Text-Zeichen haben",
      },
      maxLength: {
        value: 200,
        message: "Bitte max 200 Text-Zeichen eingeben",
      },
    },
    answerB: {
      required: "Bitte eine Antwort eingeben",
      minLength: {
        value: 4,
        message: "Die Antwort muss min 4 Text-Zeichen haben",
      },
      maxLength: {
        value: 200,
        message: "Bitte max 200 Text-Zeichen eingeben",
      },
    },
    answerC: {
      required: "Bitte eine Antwort eingeben",
      minLength: {
        value: 4,
        message: "Die Antwort muss min 4 Text-Zeichen haben",
      },
      maxLength: {
        value: 200,
        message: "Bitte max 200 Text-Zeichen eingeben",
      },
    },
    tags: {
      required: "Bitte ein Tag eingeben",
      minLength: {
        value: 2,
        message: "Bitte min 1 Tag mit 2 Text-Zeichen eingeben",
      },
      maxLength: {
        value: 20,
        message: "Bitte max 20 Text-Zeichen eingeben",
      },
    },
  };

  const [firstSubmit, setFirstSubmit] = useState(false);

  function onSubmit(data) {
    isNew ? onNew(data) : onEdit(data);
  }

  function onClick() {
    setFirstSubmit(true);
  }

  return (
    <>
      <StyledFormHook onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('id', registerOptions.id)}
          type="hidden"
          name="id"
        />

        <Form.Group md="4" controlId="question">
          <Form.Label>Frage</Form.Label>
          <Form.Control
            {...register('question', registerOptions.question)}
            as="textarea"
            rows={3}
            isInvalid={firstSubmit && !(!errors?.question)}
            isValid={firstSubmit && (!errors?.question)}
            name="question"
            maxLength={300}
          />
          <Form.Control.Feedback type="invalid">
            {firstSubmit && errors?.question && errors.question.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="answerA">
          <Form.Label>Antwort A</Form.Label>
          <Form.Control
            {...register('answerA', registerOptions.answerA)}
            as="textarea"
            rows={2}
            isInvalid={firstSubmit && !(!errors?.answerA)}
            isValid={firstSubmit && (!errors?.answerA)}
            name="answerA"
            maxLength={300}
          />
          <Form.Control.Feedback type="invalid">
            {firstSubmit && errors?.answerA && errors.answerA.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="answerB">
          <Form.Label>Antwort B</Form.Label>
          <Form.Control
            {...register('answerB', registerOptions.answerB)}
            as="textarea"
            rows={2}
            isInvalid={firstSubmit && !(!errors?.answerB)}
            isValid={firstSubmit && (!errors?.answerB)}
            name="answerB"
            maxLength={300}
          />
          <Form.Control.Feedback type="invalid">
            {firstSubmit && errors?.answerB && errors.answerB.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group md="4" controlId="answerC">
          <Form.Label>Antwort C</Form.Label>
          <Form.Control
            {...register('answerC', registerOptions.answerC)}
            as="textarea"
            rows={2}
            isInvalid={firstSubmit && !(!errors?.answerC)}
            isValid={firstSubmit && (!errors?.answerC)}
            name="answerC"
            maxLength={300}
          />
          <Form.Control.Feedback type="invalid">
            {firstSubmit && errors?.answerC && errors.answerC.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Check
          {...register('correctly')}
          type="radio"
          inline
          label="Antwort A ist richtig"
          name="correctly"
          id="optA"
          value="A"
        />
        <Form.Check
          {...register('correctly')}
          type="radio"
          inline
          label="Antwort B ist richtig"
          name="correctly"
          id="optB"
          value="B"
        />
        <Form.Check
          {...register('correctly')}
          type="radio"
          inline
          label="Antwort C ist richtig"
          name="correctly"
          id="optC"
          value="C"
        />

        <Form.Group md="4" controlId="tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control
            {...register('tags', registerOptions.tags)}
            type="text"
            isInvalid={firstSubmit && !(!errors?.tags)}
            isValid={firstSubmit && (!errors?.tags)}
            name="tags"
            maxLength={30}
            placeholder="tag1,tag2..."
          />
          <Form.Control.Feedback type="invalid">
            {firstSubmit && errors?.tags && errors.tags.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button onClick={onClick} type="submit">Speichern</Button>
      </StyledFormHook>

      <Nav isEdit={!isNew}/>
    </>
  );
}

const StyledFormHook = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  
  label {
    margin: 0;
  }

  input[type=text],
  textarea {
    min-width: 320px;
  }
  
  button {
    margin-top: 20px;
  }
`
