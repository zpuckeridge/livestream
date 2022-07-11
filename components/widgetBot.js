import * as React from "react";
import WidgetBot, { API } from "@widgetbot/react-embed";

export class Chat extends React.Component {
    if (typeof window !== "undefined") {
  api = API;

  onAPI(api = API) {
    this.api = api;
    api.on("signIn", (user) => {
      console.log(`Signed in as ${user.name}`, user);
    });
  }

  handleClick() {
    this.api.emit(
      "sendMessage",
      `Hello world! from \`@widgetbot/react-embed\``
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>
          {`Send "Hello world"`}
        </button>
        <WidgetBot
          server="299881420891881473"
          channel="355719584830980096"
          onAPI={this.onAPI.bind(this)}
        />
      </div>
    );

}
}
