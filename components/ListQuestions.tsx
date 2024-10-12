import React, { useState } from 'react';
import style from '@/styles/components/listQuestions.module.css';
import { Reorder, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { deleteImage } from '@/actions/deleteImg';

const variant = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

interface ListQuestionsProps {
  listQuestions: question[];
  setListQuestions: React.Dispatch<React.SetStateAction<question[]>>;
  selectedQuestion: question | null;
  setSelectedQuestion: React.Dispatch<React.SetStateAction<question | null>>;
}

const ListQuestions = ({
  listQuestions,
  setListQuestions,
  setSelectedQuestion,
  selectedQuestion,
}: ListQuestionsProps) => {
  const removeQuestion = (item: question) => {
    setListQuestions(
      listQuestions.filter((question) => question.id !== item.id)
    );
    if (item.image?.public_id) {
      deleteImage(item.image.public_id);
    }
  };
  return (
    <Reorder.Group
      as="ul"
      axis="y"
      values={listQuestions}
      onReorder={setListQuestions}
      className={style.listQuestions}
    >
      <h3 className={style.title}>Список питань</h3>
      <AnimatePresence initial={false}>
        {listQuestions.map((item, index) => (
          <Reorder.Item
            key={item.id}
            value={item}
            whileDrag={{ scale: 1.1 }}
            {...variant}
          >
            <div
              className={`${style.itemTest} ${
                selectedQuestion?.id === item.id ? style.itemTestActive : ''
              }`}
            >
              <div className={style.titleItem}>Питання №{index + 1}</div>
              {item.image && (
                <div className={style.preview_container}>
                  <img
                    src={item.image.url}
                    alt="Preview"
                    className={style.preview_image}
                  />
                </div>
              )}
              <div className={style.question}>{item.question}</div>
              {item.answers.map((answer, idx) => (
                <div
                  key={idx}
                  className={`${style.answer_options} ${
                    answer.isCorrect ? style.correct_answer : ''
                  }`}
                >
                  {answer.text}
                </div>
              ))}
              <button
                className={style.removeBtn}
                onClick={() => {
                  removeQuestion(item);
                }}
              >
                <FaTimes color="grey" size={10} />
              </button>
              <button
                onClick={() => setSelectedQuestion?.(item)}
                className={style.editBtn}
              >
                <FaPen color="grey" size={10} />
              </button>
            </div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default ListQuestions;
