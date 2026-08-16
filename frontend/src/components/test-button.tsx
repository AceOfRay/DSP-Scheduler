import { Button } from "@/components/ui/button";

function TestButton() {
  const handleClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/button-click",
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Backend request failed");
      }

      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("Error contacting backend:", error);
    }
  };

  return (
    <Button onClick={handleClick}>
      Test Backend
    </Button>
  );
}

export default TestButton;