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
      answer: item.answer,
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
    answer: {
      required: "Bitte eine Antwort eingeben",
      minLength: {
        value: 10,
        message: "Die Antwort muss min 10 Text-Zeichen haben",
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

        <Form.Group md="4" controlId="answer">
          <Form.Label>Antwort</Form.Label>
          <Form.Control
            {...register('answer', registerOptions.answer)}
            as="textarea"
            rows={3}
            isInvalid={firstSubmit && !(!errors?.answer)}
            isValid={firstSubmit && (!errors?.answer)}
            name="answer"
            maxLength={300}
          />
          <Form.Control.Feedback type="invalid">
            {firstSubmit && errors?.answer && errors.answer.message}
          </Form.Control.Feedback>
        </Form.Group>

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
