import ProductItem from './ProductItem';
import classes from './Products.module.css';


const DUMY_PRODUCTS = [
  {
    id: 'p1',
    price: 6,
    title: 'Test',
    description: 'This is a first product - amazing!',
  },
  {
    id: 'p2',
    price: 22,
    title: 'Test two',
    description: 'This is a second product - amazing!',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
        
      </ul>
    </section>
  );
};

export default Products;
