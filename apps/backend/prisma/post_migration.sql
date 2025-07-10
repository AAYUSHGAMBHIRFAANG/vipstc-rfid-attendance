-- Ensure rfidUid is unique across Student and Faculty
CREATE OR REPLACE FUNCTION validate_unique_rfid() RETURNS TRIGGER AS $$
DECLARE
    exists_in_Student  INTEGER;
    exists_in_Faculty  INTEGER;
BEGIN
    IF TG_TABLE_NAME = 'Student' THEN
        SELECT 1 INTO exists_in_Faculty
        FROM Faculty
        WHERE rfiduid = NEW.rfiduid
        LIMIT 1;
        IF exists_in_Faculty IS NOT NULL THEN
            RAISE EXCEPTION 'RFID % already assigned to a Faculty member', NEW.rfiduid;
        END IF;
    ELSIF TG_TABLE_NAME = 'Faculty' THEN
        SELECT 1 INTO exists_in_Student
        FROM Student
        WHERE rfiduid = NEW.rfiduid
        LIMIT 1;
        IF exists_in_Student IS NOT NULL THEN
            RAISE EXCEPTION 'RFID % already assigned to a Student', NEW.rfiduid;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_unique_rfid_Student ON Student;
DROP TRIGGER IF EXISTS trg_unique_rfid_Faculty ON Faculty;

CREATE CONSTRAINT TRIGGER trg_unique_rfid_Student
AFTER INSERT OR UPDATE OF rfiduid ON Student
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION validate_unique_rfid();

CREATE CONSTRAINT TRIGGER trg_unique_rfid_Faculty
AFTER INSERT OR UPDATE OF rfiduid ON Faculty
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE FUNCTION validate_unique_rfid();
