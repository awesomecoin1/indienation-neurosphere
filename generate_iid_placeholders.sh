#!/data/data/com.termux/files/usr/bin/bash

OUTPUT_FILE="community_iid_placeholders.txt"
echo "NeuroSphere – Community Consensus IID Placeholders" > $OUTPUT_FILE
echo "Generated at: $(date -u +'%Y-%m-%dT%H:%M:%SZ')" >> $OUTPUT_FILE
echo "-----------------------------------------------" >> $OUTPUT_FILE

# Daftar Komunitas secara manual (Paling Stabil)
for COMM in "NTT:IID-NTT-KEY" "ROYAL_SINERGI:IID-KST-KEY" "WONGSO_MUNADI:IID-WMN-KEY" "KEBAIKAN:IID-KBK-KEY"; do
    NAME=$(echo $COMM | cut -d: -f1)
    PREFIX=$(echo $COMM | cut -d: -f2)
    
    echo -e "\nCommunity: $NAME" >> $OUTPUT_FILE
    echo "Consensus: 9/9 Multi-Sig" >> $OUTPUT_FILE
    
    for i in {01..09}; do
        echo "  $PREFIX-$i | STATUS: UNBOUND" >> $OUTPUT_FILE
    done
done

echo -e "\n-----------------------------------------------" >> $OUTPUT_FILE
echo "Success: 36 Placeholders Generated."
cat $OUTPUT_FILE
