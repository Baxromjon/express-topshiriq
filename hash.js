const bcrypt =require('bcrypt');

async function getSalt(){
    const salt = await bcrypt.genSalt();
    const password='123456';
    const pwdhash=await bcrypt.hash(password, salt);
    console.log(salt);
    console.log(pwdhash);
}

getSalt();