describe('Create Test as Authorized User', () => {
  // beforeEach(() => {
  //   // Заходим в систему через UI или API и сохраняем куки
  //   cy.setCookie(
  //     'authjs.session-token',
  //     'eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoickRNcWlwQWFOcUdDNnA0eFNscVMxSVJVeHg3ZkY3cXVZVXIwUWg5dURHbW9sWEJiU0pxeTdCUEdPdkZkVGdGLWJWd3hiZVpsWDlKa2pLZUVEUEVIWncifQ..lp_HNlnhHlr8j_RZtAVnFw.Xz3GWQ8hyqV48_jffROUZlCyO9ZMF18kMe8_EamC6PimzxbMY1mEaADtcsJKzv6y7zBElC3SKGrvvO7uekOu4saTc0G7mgdrLCsvWcF29CNm_LnF8UrNi6Sa7D8K6AE-1fFYHokfuPJC9Y5DYBSBkvpsPAhTOYqHl0k4LWf6CTLoOX--opNXE8jXbEEf-JeK5RgP0zwjUjQV9qSC8CKhgswWQUhItCv1tjExaNGLSpxRAAkT-4I5SgCC3CV3zWTImbSZDg_XIQn23aDGHF3JvQ.84TvHC9MQBnZ5iFVQiypNtGNNg8bu21pgMDHc-y5qb4'
  //   ); // Пример, используй актуальное имя и значение куки
  // });

  it('login', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get(
      '.header_auth_buttons__j_Pap > .LinkBorderButton_button__rPJQS'
    ).click();
    cy.wait(1000);
    cy.get('#Email').type('testEmail@nextmail.com');
    cy.get('#password').type('12345678');
    cy.get(':nth-child(3) > .undefined').click();
    cy.wait(1000);
    cy.url().should('include', '/');
    cy.wait(4000);
  });

  it('create', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get(
      '.header_auth_buttons__j_Pap > .LinkBorderButton_button__rPJQS'
    ).click();
    cy.wait(1000);
    cy.get('#Email').type('testEmail@nextmail.com');
    cy.get('#password').type('12345678');
    cy.get(':nth-child(3) > .undefined').click();
    cy.wait(1000);
    cy.url().should('include', '/');
    cy.wait(4000);
    cy.visit('/create-page');
    cy.get('#testName').type('Test Title');
    // first question
    cy.get('.CreateQuestions_dropdown_btn__VHC_0').click();
    cy.get('.CreateQuestions_dropdown_content__iNrvX > :nth-child(1)').click();
    cy.get('#body-question').type('Test text question');
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get('.CreateQuestions_input_answer__Q0OXp').type('Test answer 1');
    cy.get('[type="radio"]').click();
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get(':nth-child(2) > .CreateQuestions_input_answer__Q0OXp').type(
      'Test answer 2'
    );
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get(':nth-child(3) > .CreateQuestions_input_answer__Q0OXp').type(
      'Test answer 3'
    );
    cy.get('.CreateQuestions_add_question_btn__y2uXB').click();
    // second question
    cy.get('.CreateQuestions_dropdown_btn__VHC_0').click();
    cy.get('.CreateQuestions_dropdown_content__iNrvX > :nth-child(1)').click();
    cy.get('#body-question').type('Test text question 2');
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get('.CreateQuestions_input_answer__Q0OXp').type('Test answer 11');
    cy.get('[type="radio"]').click();
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get(':nth-child(2) > .CreateQuestions_input_answer__Q0OXp').type(
      'Test answer 22'
    );
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get(':nth-child(3) > .CreateQuestions_input_answer__Q0OXp').type(
      'Test answer 33'
    );
    cy.get('.CreateQuestions_add_question_btn__y2uXB').click();
    // third question
    cy.get('.CreateQuestions_dropdown_btn__VHC_0').click();
    cy.get('.CreateQuestions_dropdown_content__iNrvX > :nth-child(2)').click();
    cy.get('#body-question').type('Test text question 3');
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get('.CreateQuestions_input_answer__Q0OXp').type('Test answer 111');
    cy.get('[type="checkbox"]').click();
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get(':nth-child(2) > .CreateQuestions_input_answer__Q0OXp').type(
      'Test answer 222'
    );
    cy.get(':nth-child(2) > [type="checkbox"]').click();
    cy.get('.CreateQuestions_add_answer_btn__qQ2v0').click();
    cy.get(':nth-child(3) > .CreateQuestions_input_answer__Q0OXp').type(
      'Test answer 333'
    );
    cy.get('.CreateQuestions_add_question_btn__y2uXB').click();
    cy.get('.createTest_header__GVUnH > button').click();
    cy.contains('Тест успішно створено').should('be.visible');
  });

  it('check new test', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get(
      '.header_auth_buttons__j_Pap > .LinkBorderButton_button__rPJQS'
    ).click();
    cy.wait(1000);
    cy.get('#Email').type('testEmail@nextmail.com');
    cy.get('#password').type('12345678');
    cy.get(':nth-child(3) > .undefined').click();
    cy.wait(1000);
    cy.url().should('include', '/');
    cy.wait(4000);
    cy.visit('/ready-tests');
    cy.contains('Test Title').click({
      force: true,
    });
    // карточка 1
    cy.get('#question-0').within(() => {
      cy.contains('Test text question').should('be.visible');
      cy.contains('Test answer 1')
        .should('be.visible')
        .should('have.css', 'color', 'rgb(33, 221, 0)');
      cy.contains('Test answer 2').should('be.visible');
      cy.contains('Test answer 3').should('be.visible');
    });
    // карточка 2
    cy.get('#question-1').within(() => {
      cy.contains('Test text question 2').should('be.visible');
      cy.contains('Test answer 11')
        .should('be.visible')
        .should('have.css', 'color', 'rgb(33, 221, 0)');
      cy.contains('Test answer 22').should('be.visible');
      cy.contains('Test answer 33').should('be.visible');
    });
    // карточка 3
    cy.get('#question-2').within(() => {
      cy.contains('Test text question 3').should('be.visible');
      cy.contains('Test answer 111')
        .should('be.visible')
        .should('have.css', 'color', 'rgb(33, 221, 0)');
      cy.contains('Test answer 222')
        .should('be.visible')
        .should('have.css', 'color', 'rgb(33, 221, 0)');
      cy.contains('Test answer 333').should('be.visible');
    });
  });

  it('run test', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get(
      '.header_auth_buttons__j_Pap > .LinkBorderButton_button__rPJQS'
    ).click();
    cy.wait(1000);
    cy.get('#Email').type('testEmail@nextmail.com');
    cy.get('#password').type('12345678');
    cy.get(':nth-child(3) > .undefined').click();
    cy.wait(1000);
    cy.url().should('include', '/');
    cy.wait(4000);
    cy.visit('/ready-tests');
    cy.contains('Test Title').click({
      force: true,
    });
    cy.contains('Test Title').should('be.visible');
    cy.get('#test-run-link').click({ force: true });
    cy.wait(1000);
    cy.get('#btn-end-step-1').click();
    cy.get(':nth-child(1) > input').type('Test Name');
    cy.get(':nth-child(2) > input').type('TestEmail@gmail.com');
    cy.get('.stepFormRunTest_btn_next_step__Fwm08').click();
    cy.wait(1000);
    cy.contains('Test answer 1').click();
    cy.contains('Test answer 22').click();
    cy.contains('Test answer 111').click();
    cy.contains('Test answer 222').click();
    cy.contains('Завершити тест').click();
    cy.wait(1000);
    cy.get('.runTest_correct__glBJJ').should(
      'have.css',
      'background-color',
      'rgb(0, 128, 0)'
    );
    cy.get('.runTest_incorrect__QAE1u').should(
      'have.css',
      'background-color',
      'rgb(255, 0, 0)'
    );
    cy.contains('Покинути сторiнку').click();
    cy.wait(1000);
    cy.url().should('include', '/test-completion');
    cy.contains('Дякую за успішне завершення тесту').should('be.visible');
  });

  it('check results tests', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get(
      '.header_auth_buttons__j_Pap > .LinkBorderButton_button__rPJQS'
    ).click();
    cy.wait(1000);
    cy.get('#Email').type('testEmail@nextmail.com');
    cy.get('#password').type('12345678');
    cy.get(':nth-child(3) > .undefined').click();
    cy.wait(1000);
    cy.url().should('include', '/');
    cy.wait(4000);
    cy.visit('/ready-tests');
    cy.wait(1000);
    cy.contains('Test Title').click();
    cy.get('.SpecificTest_resultsLink__d6QAY').click();
    cy.wait(1000);
    cy.get('.resultTest_result_card__R13uC').click();
    cy.wait(1000);
    cy.contains("Iм'я: Test Name").should('be.visible');
    cy.contains('Пошта: TestEmail@gmail.com').should('be.visible');
    cy.contains('Кількість питань: 3').should('be.visible');
    cy.contains('Кількість правильних відповідей:2').should('be.visible');
    cy.contains('Кількість не правильних відповідей:1').should('be.visible');
    cy.contains('питання 1: Test text question').should('be.visible');
    cy.contains('відповіді користувача: Test answer 1').should('be.visible');
    // карточка с первым вопросом
    cy.get('.detailed-report_container___dVjf > :nth-child(9)').should(
      'have.css',
      'background-color',
      'rgb(172, 255, 168)'
    );
    cy.get(
      ':nth-child(9) > .detailed-report_allAnswer__U8JqL > .detailed-report_correctAnswer__7tn_H'
    )
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.text', 'Test answer 1');
    cy.get(
      ':nth-child(9) > .detailed-report_allAnswer__U8JqL > .detailed-report_answer__U8cuC.detailed-report_wrongAnswer__RqyIK'
    )
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.text', 'Test answer 2');
    cy.get(':nth-child(9) > .detailed-report_allAnswer__U8JqL > .undefined')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.text', 'Test answer 3');

    // карточка с вторым вопросом
    cy.get('.detailed-report_wrongUserAnswer__j5mEZ').should(
      'have.css',
      'background-color',
      'rgb(255, 168, 170)'
    );
    cy.get(
      '.detailed-report_wrongUserAnswer__j5mEZ > .detailed-report_allAnswer__U8JqL > .detailed-report_correctAnswer__7tn_H'
    )
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.text', 'Test answer 11');
    cy.get(
      '.detailed-report_wrongUserAnswer__j5mEZ > .detailed-report_allAnswer__U8JqL > .detailed-report_answer__U8cuC.detailed-report_wrongAnswer__RqyIK'
    )
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.text', 'Test answer 22');
    cy.get(
      '.detailed-report_wrongUserAnswer__j5mEZ > .detailed-report_allAnswer__U8JqL > .undefined'
    )
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.text', 'Test answer 33');

    //карточка с третим вопросом
    cy.get('.detailed-report_container___dVjf > :nth-child(11)').should(
      'have.css',
      'background-color',
      'rgb(172, 255, 168)'
    );
    cy.get(':nth-child(11) > .detailed-report_allAnswer__U8JqL > :nth-child(2)')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.text', 'Test answer 111');
    cy.get(':nth-child(11) > .detailed-report_allAnswer__U8JqL > :nth-child(3)')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .and('have.text', 'Test answer 222');
    cy.get(':nth-child(11) > .detailed-report_allAnswer__U8JqL > .undefined')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.text', 'Test answer 333');

    //удаления результата
    cy.get('.ButtonDeleteResultTest_testItemDelete__qtuz4').click();
    cy.url().should('include', '/ready-tests');
  });

  it('delete test', () => {
    cy.visit('/');
    cy.wait(1000);
    cy.get(
      '.header_auth_buttons__j_Pap > .LinkBorderButton_button__rPJQS'
    ).click();
    cy.wait(1000);
    cy.get('#Email').type('testEmail@nextmail.com');
    cy.get('#password').type('12345678');
    cy.get(':nth-child(3) > .undefined').click();
    cy.wait(1000);
    cy.url().should('include', '/');
    cy.wait(4000);
    // удаление теста
    cy.visit('/ready-tests');
    cy.wait(1000);
    cy.get('.readyTest_testItem__IbRlZ').should('be.visible').click();
    cy.wait(1000);
    cy.contains('Видалити тест').should('be.visible').click();
    cy.url().should('include', '/');
  });
});
