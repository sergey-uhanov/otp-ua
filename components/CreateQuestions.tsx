'use client';
import { useEffect, useState } from 'react';
import style from '@/styles/components/CreateQuestions.module.css';
import { v4 } from 'uuid';
import { FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { FaPaperclip } from 'react-icons/fa';
import { UploadImg } from '@/actions/uploadImg';
import { deleteImage } from '@/actions/deleteImg';
import { UploadApiResponse } from 'cloudinary';

const optionsTypeAnswer = [
  { type: 'single', name: 'Одна правильна відповідь' },
  { type: 'multiple', name: 'Кілька правильних відповідей' },
  { type: 'open', name: 'Відкрите питання' },
];
const variant = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

interface CreateQuestionProps {
  listQuestions: question[];
  setListQuestions: (questions: question[]) => void;
  selectedQuestion: question | null;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<question | null>>;
  error: string | null;
}

const CreateQuestion = ({
  error,
  listQuestions,
  setListQuestions,
  selectedQuestion,
  setSelectedQuestion,
}: CreateQuestionProps) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<answer[]>([]);
  const [answerType, setAnswerType] = useState<TypeAnswerType>('');
  const [isActiveSelect, setIsActiveSelect] = useState(false);
  const [errorMassage, setErrorMassage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<img | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(false);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  const handleAnswerChange = (index: number, text: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index].text = text;
    setAnswers(updatedAnswers);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, { text: '', isCorrect: false }]);
  };

  const handleRemoveAnswer = (index: number) => {
    const updatedAnswers = answers.filter((_, i) => i !== index);
    setAnswers(updatedAnswers);
  };

  const handleCorrectAnswerToggle = (index: number) => {
    const updatedAnswers = [...answers];
    if (answerType === 'single') {
      updatedAnswers.forEach((answer, i) => {
        answer.isCorrect = i === index;
      });
    } else {
      updatedAnswers[index].isCorrect = !updatedAnswers[index].isCorrect;
    }
    setAnswers(updatedAnswers);
  };

  const handleAnswerTypeChange = () => {
    if (answerType === 'open') {
      setAnswers([]);
    }
  };
  const answerTypeName = (type: TypeAnswerType) => {
    return optionsTypeAnswer.find((option) => option.type === type)?.name;
  };

  const isFillCheck = () => {
    if (!question.trim()) {
      setErrorMassage('Поле запитання не може бути порожнім');
      return false;
    }

    // Проверяем, что выбран тип ответа
    if (!answerType) {
      setErrorMassage('Виберіть тип відповіді');
      return false;
    }

    // Проверяем, что добавлено хотя бы одно поле для ответа (если тип ответа не "open")
    if (answerType !== 'open' && answers.length === 0) {
      setErrorMassage('Додайте хоча б один варіант відповіді');
      return false;
    }

    // Проверяем, что все ответы имеют текст
    if (
      answerType !== 'open' &&
      answers.some((answer) => !answer.text.trim())
    ) {
      setErrorMassage('Усі відповіді мають бути заповнені');
      return false;
    }
    if (
      (answerType === 'single' || answerType === 'multiple') &&
      !answers.some((answer) => answer.isCorrect)
    ) {
      setErrorMassage('Виберіть хоча б один правильний варіант відповіді');
      return false;
    }
    return true;
  };

  const handleAddQuestion = async () => {
    if (!isFillCheck()) {
      return;
    }
    let upLoadImg2: img | null = null;
    setIsLoadingQuestion(true);
    if (formData) {
      const dataImg = await handleFileUpload();
      upLoadImg2 = {
        url: dataImg!.url,
        public_id: dataImg!.public_id,
      };
    }

    const newQuestion: question = {
      id: v4(),
      question: question,
      type: answerType,
      answers: answers,
      image: upLoadImg2 ? upLoadImg2 : null,
    };

    setListQuestions([...listQuestions, newQuestion]);
    upLoadImg2 = null;
    setQuestion('');
    setAnswers([]);
    setAnswerType('');
    setErrorMassage(null);
    setSelectedImage(null);
    setFormData(null);
    setIsLoadingQuestion(false);
    setPreviewImg(null);
  };
  useEffect(() => {
    if (selectedQuestion?.id) {
      setQuestion(selectedQuestion.question);
      setAnswers(selectedQuestion.answers);
      setAnswerType(selectedQuestion.type);
      setSelectedImage(
        selectedQuestion.image?.url
          ? {
              url: selectedQuestion.image.url,
              public_id: selectedQuestion.image?.public_id,
            }
          : null
      );
    }
  }, [selectedQuestion]);

  const handleChangeQuestion = () => {
    if (!isFillCheck()) {
      return;
    }

    setListQuestions(
      listQuestions.map((q) =>
        q.id === selectedQuestion?.id
          ? {
              ...q,
              question: question,
              type: answerType,
              answers: answers,
              image: selectedImage
                ? { url: selectedImage.url, public_id: selectedImage.public_id }
                : null,
            }
          : q
      )
    );
    setSelectedQuestion(null);
    setQuestion('');
    setAnswers([]);
    setAnswerType('');
    setSelectedImage(null);
    setFormData(null);
    setErrorMassage(null);
    setPreviewImg(null);
  };

  const handleFilePreupload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    const imgFormData = new FormData();
    imgFormData.append('file', file!);

    const reader = new FileReader();
    if (file) {
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setFormData(imgFormData);
  };
  const handleFileUpload = async () => {
    if (formData) {
      try {
        const response: UploadApiResponse | null = await UploadImg(formData);

        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Помилка під час завантаження файлу', error);
      }
    }
  };
  const deleteSelectedImage = async () => {
    if (selectedQuestion!.image?.public_id) {
      await deleteImage(selectedQuestion!.image?.public_id);
    }
    setSelectedImage(null);
  };
  return (
    <div className={style.create_page}>
      <div className={style.editing_question_area}>
        <div className={style.header}>
          <h2 className={style.title}>Редактор питання</h2>
          <div className={style.dropdown}>
            <div
              onClick={() => setIsActiveSelect(!isActiveSelect)}
              className={`${style.dropdown_btn} ${
                isActiveSelect ? style.active : ''
              }`}
            >
              {answerType === ''
                ? 'Виберіть тип відповіді'
                : answerTypeName(answerType)}
            </div>
            {
              <div
                className={`${style.dropdown_content} ${
                  isActiveSelect ? style.active : style.inactive
                }`}
              >
                {optionsTypeAnswer.map((option) => (
                  <div
                    key={option.type}
                    className={style.dropdown_item}
                    onClick={() => {
                      handleAnswerTypeChange();
                      setAnswerType(option.type as TypeAnswerType);
                      setIsActiveSelect(!isActiveSelect);
                    }}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            }
          </div>
        </div>
        <div className={style.input_container}>
          {selectedImage && (
            <div className={style.preview_container}>
              <img
                src={selectedImage.url}
                alt="Preview"
                className={style.preview_image}
              />
              <FaTimes
                className={style.remove_image_btn}
                onClick={() => deleteSelectedImage()}
              />
            </div>
          )}
          {previewImg && (
            <div className={style.preview_container}>
              <img
                src={previewImg}
                alt="Preview"
                className={style.preview_image}
              />
              <FaTimes
                className={style.remove_image_btn}
                onClick={() => setPreviewImg(null)}
              />
            </div>
          )}
          <textarea
            id="body-question"
            autoComplete="off"
            placeholder="Введіть запитання"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            cols={50}
            className={style.input_question}
          />
          <label className={style.attachment_button}>
            <FaPaperclip />
            <input
              type="file"
              onChange={handleFilePreupload}
              className={style.file_input}
            />
          </label>
        </div>

        {answerType !== 'open' && (
          <div className={style.answers_section}>
            <AnimatePresence>
              {answers.map((answer, index) => (
                <motion.div {...variant} key={index} className={style.answer}>
                  <input
                    type="text"
                    placeholder={`Відповідь ${index + 1}`}
                    value={answer.text}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                    className={style.input_answer}
                  />
                  <input
                    type={answerType === 'single' ? 'radio' : 'checkbox'}
                    className={style.correct_answer_checkbox}
                    checked={answer.isCorrect}
                    onChange={() => handleCorrectAnswerToggle(index)}
                  />
                  <button
                    className={style.remove_answer_btn}
                    onClick={() => handleRemoveAnswer(index)}
                  >
                    <FaTimes />
                    <span className={style.tooltip_text}>
                      Видалити відповідь
                    </span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {answerType !== '' && (
              <button
                className={style.add_answer_btn}
                onClick={handleAddAnswer}
              >
                Добавити відповідь
              </button>
            )}
          </div>
        )}
      </div>
      {error && <div className={style.error_message}>{error}</div>}
      {errorMassage && (
        <div className={style.error_message}>{errorMassage}</div>
      )}
      {selectedQuestion?.id ? (
        <button
          onClick={() => handleChangeQuestion()}
          className={style.add_question_btn}
        >
          Зберегти
        </button>
      ) : (
        <button
          disabled={isLoadingQuestion}
          className={`${style.add_question_btn} ${
            isLoadingQuestion ? style.loading_btn : ''
          }`}
          onClick={() => handleAddQuestion()}
        >
          {isLoadingQuestion ? 'Збереження...' : 'Додати питання'}
        </button>
      )}
    </div>
  );
};

export default CreateQuestion;
