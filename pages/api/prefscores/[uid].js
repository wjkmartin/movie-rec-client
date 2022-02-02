export default function handler(req, res) {
    const { uid, age, gender } = req.query;
    res.end(`uid: ${uid}`);
}

