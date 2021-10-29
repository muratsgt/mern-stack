import { Card } from 'antd';
const {Meta} = Card;

const BookCard = ({book, handleClick}) => {
    return (
        <Card
            onClick={()=> handleClick(book?._id)}
            key={book?._id}
            hoverable
            className="book-card-style"
            cover={<img style={{height:240, objectFit:"cover"}} alt="example"
                src={book?.imageLink} />}
        >
            <Meta title={book?.title} description={book?.author} />
        </Card>
    )
};

export default BookCard;