type JoinScreenProps = {
    handleJoin:(name:string, id:string) => void;
};

//get endpoint from url

//get api from endpoint
const joinGame = async (endpointId: string, username: string) => {
  console.log(await datex`${endpointId}.PlayerAPI.joinGame(${username})`)
}

export default function JoinScreen({handleJoin}:JoinScreenProps) {
    const id = $("");
    const name = $("");

    return (
      <div>
          <label>ID:</label>
          <input
            type="text"
            value={id.val}
            onchange={(e:any) => id.val = e.target.value}
            placeholder="Endpoint ID eingeben"
          />
          <label>Name:</label>
          <input
            type="text"
            value={name.val}
            onchange={(e:any) => name.val = e.target.value}
            placeholder="Name eingeben"
          />
          <button onclick={() => joinGame(id.val, name.val)}>Join</button>
      </div>
    );
}