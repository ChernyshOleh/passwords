import { useContext, useState } from "react";
import Navigate from "./Navigate";
import { AsyncContext, LoadingContext } from "./src/context";
import { AppLoading } from "expo";

export default function App() {
  // const cont = useContext(AsyncContext);
  // const [isReady, setIsReady] = useState(false);

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={cont.userFromAsync}
  //       onError={(err) => console.log(err)}
  //       onFinish={setIsReady(true)}
  //     />
  //   );
  // }

  return (
    <LoadingContext>
      <Navigate />
    </LoadingContext>
  );
}
