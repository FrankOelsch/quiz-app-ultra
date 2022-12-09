import "../components/Navigation.js";
import styled from "styled-components";
import Nav from "../components/Navigation";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";


export default function Edit({item, setItem, onEdit, onNew, isNew}) {

  const {register, handleSubmit, formState: {errors}} = useForm({
    defaultValues: {
      question: item.question,
      answer: item.answer,
      tags: item.tags,
      id: item.id,
    }
  });

  const registerOptions = {
    id: {
      required: "id is required"
    },
    question: {
      required: "Bitte eine Frage eingeben",
      minLength: {
        value: 10,
        message: "Die Frage muss min 10 Text-Zeichen haben"
      },
      maxLength: {
        value: 200,
        message: "Bitte max 200 Text-Zeichen eingeben"
      }
    },
    answer: {
      required: "Bitte eine Antwort eingeben",
      minLength: {
        value: 10,
        message: "Die Antwort muss min 10 Text-Zeichen haben"
      },
      maxLength: {
        value: 200,
        message: "Bitte max 200 Text-Zeichen eingeben"
      }
    },
    tags: {
      required: "Bitte ein Tag eingeben",
      minLength: {
        value: 2,
        message: "Bitte min 1 Tag mit 2 Text-Zeichen eingeben"
      },
      maxLength: {
        value: 20,
        message: "Bitte max 20 Text-Zeichen eingeben"
      }
    },
  };

  function onSubmit(data) {
    isNew ? onNew(data) : onEdit(data);
  }

  return (
    <>
      <StyledFormHook onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('id', registerOptions.id)}
          type="hidden"
          name="id"
        />

        <label>Frage</label>
        <Form.Group md="4" controlId="question">
          <Form.Control
            {...register('question', registerOptions.question)}
            as="textarea"
            rows={3}
            isInvalid={!(!errors?.question)}
            isValid={(!errors?.question)}
            name="question"
            maxLength={300}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.question && errors.question.message}
          </Form.Control.Feedback>
        </Form.Group>

        <label>Antwort</label>
        <Form.Group md="4" controlId="answer">
          <Form.Control
            {...register('answer', registerOptions.answer)}
            as="textarea"
            rows={3}
            isInvalid={!(!errors?.answer)}
            isValid={(!errors?.answer)}
            name="answer"
            maxLength={300}
          />
          <Form.Control.Feedback type="invalid">
            {errors?.answer && errors.answer.message}
          </Form.Control.Feedback>
        </Form.Group>

        <label>Tags</label>
        <Form.Group md="4" controlId="tags">
          <Form.Control
            {...register('tags', registerOptions.tags)}
            type="text"
            isInvalid={!(!errors?.tags)}
            isValid={(!errors?.tags)}
            name="tags"
            maxLength={30}
            placeholder="tag1,tag2..."
          />
          <Form.Control.Feedback type="invalid">
            {errors?.tags && errors.tags.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit">Submit</Button>
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

  input[type=text],
  textarea {
    width: 300px;
  }
`
