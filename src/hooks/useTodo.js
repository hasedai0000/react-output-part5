import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo } from "../store/todo";

export const useTodo = () => {
  /** store */
  const todoList = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  /** 検索キーワード */
  const [searchKeyword, setSearchKeyword] = useState("");
  /** タスクを追加する */
  const [addInputValue, setAddInputValue] = useState("");
  /** IME変換中かどうか */
  const [isComposing, setIsComposing] = useState(false);

  /** 検索キーワードで絞り込んだTodo List */
  const filteredTodoList = useMemo(() => {
    return todoList.filter((todo) => {
      //　検索キーワードに部分一致したTodoだけを一覧表示する
      const regexp = new RegExp("" + searchKeyword, "i");
      return todo.title.match(regexp);
    });
  }, [todoList, searchKeyword]);

  /** action */
  const handleChangeSearchKeyword = (e) => {
    setSearchKeyword(e.target.value);
  };

  const onChangeAddInputValue = (e) => {
    setAddInputValue(e.target.value);
  };

  /**
   * IME変換開始時の処理
   */
  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  /**
   * IME変換終了時の処理
   */
  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  /**
   * タスクを追加する
   * @param {*} e
   */
  const handleAddTodo = (e) => {
    /** エンターキーが押された時にTodoを追加する  */
    if (e.key === "Enter" && addInputValue !== "" && !isComposing) {
      dispatch(addTodo(addInputValue));
      // todo追加後、入力値をリセット
      setAddInputValue("");
    }
  };

  /**
   * タスクを削除する
   * @param { number } targetId
   * @param { string } targetTitle
   */
  const handleDeleteTodo = (targetId, targetTitle) => {
    if (window.confirm(`「 ${targetTitle}」のtodoを削除しますか？`)) {
      dispatch(deleteTodo(targetId));
    }
  };

  return {
    addInputValue,
    searchKeyword,
    filteredTodoList,
    onChangeAddInputValue,
    handleChangeSearchKeyword,
    handleAddTodo,
    handleCompositionStart,
    handleCompositionEnd,
    handleDeleteTodo,
  };
};
