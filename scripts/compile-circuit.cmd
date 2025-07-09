mkdir circuits\build
mkdir contracts
mkdir public\circuits

rd /S /Q circuits contracts public\circuits

cd circuits\build
circom ..\ageVerification.circom --r1cs --wasm --sym
cd ..\..\

snarkjs powersoftau new bn128 14 circuits\build\pot14_0000.ptau -v
echo random-entropy-%random%-%time:~0,8%
snarkjs powersoftau contribute circuits\build\pot14_0000.ptau circuits\build\pot14_0001.ptau --name="First contribution" -v
snarkjs powersoftau prepare phase2 circuits\build\pot14_0001.ptau circuits\build\pot14_final.ptau -v
snarkjs groth16 setup circuits\build\ageVerification.r1cs circuits\build\pot14_final.ptau circuits\build\ageVerification_0000.zkey
echo random-entropy-phase2-%random%-%time:~0,8%
snarkjs zkey contribute circuits\build\ageVerification_0000.zkey circuits\build\ageVerification_0001.zkey --name="First phase2 contribution" -v
snarkjs zkey export verificationkey circuits\build\ageVerification_0001.zkey circuits\build\verification_key.json
snarkjs zkey export solidityverifier circuits\build\ageVerification_0001.zkey contracts\verifier.sol

copy /Y circuits\build\ageVerification_js\ageVerification.wasm public\circuits\
copy /Y circuits\build\ageVerification_0001.zkey public\circuits\
copy /Y circuits\build\verification_key.json public\circuits\