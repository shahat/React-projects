import React from "react";
import classes from "./page.module.css";
import Link from "next/link";
import MealGrid from "@/components/meals/meal-grid";
function MealPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>Delicious meals, created</h1>
        <span className={classes.highlight}>by you</span>
        <p> choose you favorite recipe and cook it for yourself </p>

        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main>
        <MealGrid meals={[]} />
      </main>
    </>
  );
}
export default MealPage;
