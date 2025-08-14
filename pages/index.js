import Head from "next/head";
import Layout from "../components/layout";
import ToDoList from "../components/todo-list";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Full Stack ToDo</title>
        <meta name="description" content="Full Stack To Do app" />
      </Head>

      <Layout>
        <ToDoList />
      </Layout>
    </div>
  );
}
