type JoinScreenProps = {
    handleJoin:(name:string, id:string) => void;
};

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
            placeholder="Game ID eingeben"
          />
          <label>Name:</label>
          <input
            type="text"
            value={name.val}
            onchange={(e:any) => name.val = e.target.value}
            placeholder="Name eingeben"
          />
          <button onclick={() => handleJoin(name.val, id.val)}>Join</button>
      </div>
    );
}