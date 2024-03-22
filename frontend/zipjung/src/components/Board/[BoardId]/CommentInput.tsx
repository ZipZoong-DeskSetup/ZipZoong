import CreateButton from '@/components/Board/Create/CreateButton';

function CommentInput() {
  return (
    <div>
      <label htmlFor="commentInput">댓글: </label>
      <input id="commentInput" type="text" placeholder="댓글을 입력하세요" />
      <CreateButton />
    </div>
  );
}

export default CommentInput;
