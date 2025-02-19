import { useState, useEffect } from "react";
import IphoneContainer from "../components/IphoneContainer";
import ShiftCard from "../components/ShiftCard";

export default function ShiftCardAdmin() {
  const [availableShifts, setAvailableShifts] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [finishedShifts, setFinishedShifts] = useState([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await fetch("http://localhost:8000/switch");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des shifts");
        }
        const data = await response.json();

        // Trier les shifts selon leur état
        const available = data.filter((shift) => shift.state === "waiting");
        const pending = data.filter((shift) => shift.state === "processing");
        const finished = data.filter((shift) => shift.state === "validate");

        setAvailableShifts(available);
        setPendingRequests(pending);
        setFinishedShifts(finished);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchShifts();
  }, []);

  return (
    <IphoneContainer>
      <ShiftCard
        availableShifts={availableShifts}
        pendingRequests={pendingRequests}
        finishedShifts={finishedShifts}
      />
    </IphoneContainer>
  );
}
